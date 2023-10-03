import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi my name is <b>Filip</b>, I am a 3rd year CS student at UCC and this
          is my website. This is my{" "}
          <a href="https://github.com/respawn999"> Github</a>.
        </p>
        <p>
          This is a sample website - you'll be building a site like this one on{" "}
          <a href="https://nextjs.org/learn"> Next.js tutorial</a>. )
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
