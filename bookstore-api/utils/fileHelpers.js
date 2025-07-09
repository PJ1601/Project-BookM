import fs from 'fs/promises';

export const readFile = async (path) => {
    const data = await fs.readFile(path, 'utf8');
    return JSON.parse(data);
};

export const writeFile = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
};
