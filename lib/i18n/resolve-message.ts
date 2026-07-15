type Translator = (
  key: string,
  params?: Record<string, string | number>
) => string;

export function resolveMessage(t: Translator, message: string) {
  if (!message) {
    return message;
  }

  const translated = t(message);
  return translated === message ? message : translated;
}
