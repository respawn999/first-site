import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');


export function getSortedPostsData() {
    // get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // remove .md from filename to get id
        const id = fileName.replace(/\.md$/,'');

        //read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // use gray-matter to parse the post metadata section

        const matterResult = matter(fileContents);

        //combine data with the id
        return {
            id, 
            ...matterResult.data,
        };
    });
    // sort posts by date
    return allPostsData.sort((a,b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1
        }
        
    });



}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
// Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

    return fileNames.map((fileName)=> {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

