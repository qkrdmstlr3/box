export async function delay(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
}