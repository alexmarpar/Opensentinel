import { readdir } from 'fs/promises';

export default async function listDirectories(targetPath: string) {
  try {
    const items = await readdir(targetPath, { withFileTypes: true });
    
    const directories = items
      .filter(item => item.isDirectory())
      .map(item => item.name);

      return  JSON.stringify(directories);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error reading the path:', error.message);
    } else {
      console.error('Error reading the path:', error);
    }
  }
}