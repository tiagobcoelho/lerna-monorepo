import glob from "glob";
import path from "path";

const getDistName = (
  srcPath: string,
  filePath: string,
  bypassPaths: string
): string => {
  const { dir, name } = path.parse(filePath);

  const result = `${dir}/${name}`
    .replace(srcPath, "")
    .replace(bypassPaths, "")
    .split("/")
    .join("-");

  return result;
};


export const getEntryPoints = (
  srcPath: string,
  pattern: string,
  bypassPaths: string
) => {
  const entryPoints: Record<string, string> = {}
  glob
    .sync(`${srcPath}/${pattern}`)
    .filter((filePath) => !filePath.includes("node_modules"))
    .filter((filePath) => path.parse(filePath).name.indexOf("_") !== 0)
    .forEach((entry) => {
      entryPoints[getDistName(srcPath, entry, bypassPaths)] = path.resolve(
        process.cwd(),
        entry
      );
    });
    return entryPoints;
};

