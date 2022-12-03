import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
  image: string;
}
function MetaTitle({ title, description, image }: MetaProps) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta property="twitter:card" content="summary_large_image" />

        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>
    </div>
  );
}

export default MetaTitle;
