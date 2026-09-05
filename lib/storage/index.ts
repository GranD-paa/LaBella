import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Object storage for the files the app serves but does not want in the
 * database: rendered grammar pages today, whatever comes next after that.
 *
 * The bucket is private. Nothing here ever returns a URL that works on its
 * own — reads go out as short-lived signed links, minted only after the caller
 * has already checked that this learner may see this content. An unsigned
 * request to the same object gets a 403 from ArvanCloud, which is what keeps
 * paid material from being one shared link away from everyone.
 */

const READ_URL_TTL_SECONDS = 10 * 60;

let client: S3Client | null = null;

function getBucket(): string {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error("S3_BUCKET is not configured");
  return bucket;
}

function getClient(): S3Client {
  if (client) return client;

  const { S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY } =
    process.env;
  if (!S3_ENDPOINT || !S3_REGION || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
    throw new Error("Object storage is not configured");
  }

  client = new S3Client({
    region: S3_REGION,
    endpoint: S3_ENDPOINT,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
  });
  return client;
}

/**
 * Whether the app can talk to object storage at all. Callers use this to fail
 * with an explanation instead of a stack trace when the environment variables
 * have not been set — the state the container is in until they are added to
 * its runtime environment.
 */
export function isObjectStorageConfigured(): boolean {
  return Boolean(
    process.env.S3_ENDPOINT &&
      process.env.S3_REGION &&
      process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY
  );
}

export async function putObject(
  key: string,
  body: Buffer,
  contentType: string
): Promise<void> {
  await getClient().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

/**
 * A link that reads one object and stops working shortly after. Ten minutes is
 * long enough to read a page and short enough that a copied URL is worthless
 * by the time it is pasted anywhere.
 */
export function signedReadUrl(key: string): Promise<string> {
  return getSignedUrl(
    getClient(),
    new GetObjectCommand({ Bucket: getBucket(), Key: key }),
    { expiresIn: READ_URL_TTL_SECONDS }
  );
}

export async function deleteObject(key: string): Promise<void> {
  await getClient().send(
    new DeleteObjectCommand({ Bucket: getBucket(), Key: key })
  );
}

/**
 * Deletes in batches of a thousand, the most one S3 request accepts. Removing
 * a grammar document means removing every page it rendered to, which is one
 * call rather than one call per page.
 */
export async function deleteObjects(keys: string[]): Promise<void> {
  if (keys.length === 0) return;

  for (let index = 0; index < keys.length; index += 1000) {
    const batch = keys.slice(index, index + 1000);
    await getClient().send(
      new DeleteObjectsCommand({
        Bucket: getBucket(),
        Delete: { Objects: batch.map((Key) => ({ Key })) },
      })
    );
  }
}
