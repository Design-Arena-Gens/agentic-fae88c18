import Head from "next/head";
import Link from "next/link";
import type { InferGetServerSidePropsType } from "next";

import { TARGET_URL, craftFunnyComment, fetchDeveloperSummary, type RemoteSummary } from "@/lib/moltbook";

type HomeProps = {
  summary: RemoteSummary | null;
  comment: string;
  generatedAt: string;
};

export async function getServerSideProps() {
  const summary = await fetchDeveloperSummary();
  const comment = craftFunnyComment(summary);

  return {
    props: {
      summary,
      comment,
      generatedAt: new Date().toISOString(),
    },
  };
}

export default function Home({ summary, comment }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Moltbook Dev Quipper</title>
        <meta name="description" content="Fetches the Moltbook developers page and adds a goofy comment." />
      </Head>

      <main>
        <article className="card">
          <header>
            <h1 className="heading">Remote Recon: Moltbook Developers</h1>
          </header>

          <section className="summary">
            <div className="summary-section">
              <h2>Fetched Vibes</h2>
              <p>{summary?.title ?? "Could not retrieve the title just yet."}</p>
            </div>

            <div className="summary-section">
              <h2>What It Smells Like</h2>
              <p>{summary?.description ?? "Our scouts are still decoding the developer incense."}</p>
            </div>

            <div className="summary-section">
              <h2>Headline Loot</h2>
              {summary?.highlights?.length ? (
                <ul>
                  {summary.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : (
                <p>The headings hid under a blanket fort before we arrived.</p>
              )}
            </div>
          </section>

          <section className="comment">
            <p>
              <strong>Funny Comment Drop:</strong> {comment}
            </p>
          </section>

          <div className="actions">
            <Link href={TARGET_URL} target="_blank" rel="noopener noreferrer">
              Visit Moltbook Developers
            </Link>
            <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              Deploy Your Mischief
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
