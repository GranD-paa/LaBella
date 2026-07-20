import { z } from "zod";

const LOCAL_ENTITY_ID_PATTERN =
  /^(quiz|question|lesson|attempt|vocab|grammar|video)-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isEntityId(value: string): boolean {
  return (
    z.string().uuid().safeParse(value).success ||
    LOCAL_ENTITY_ID_PATTERN.test(value)
  );
}

export function entityIdSchema(message = "Invalid id") {
  return z.string().min(1, message).refine(isEntityId, { message });
}

export function entityIdRecordSchema(valueMessage = "Please provide an answer") {
  return z.record(z.string().min(1), z.string().min(1, valueMessage));
}
