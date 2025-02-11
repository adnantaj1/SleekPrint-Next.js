export function handleError(error: unknown) {
  console.error("🔥 ERROR:", error);

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}
