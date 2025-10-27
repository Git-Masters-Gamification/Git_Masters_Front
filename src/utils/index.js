// src/utils/index.js
export const withRetry = async (fn, attempts = 2, delay = 1000) => {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`Retry ${i + 1}/${attempts} failed, retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw lastError;
};