import "../../nyheter/page.css";

export const metadata = {
  title: "Cyber security for vital societal functions",
  description:
    "C-Resiliens, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
  openGraph: {
    title: "Cyber security for vital societal functions",
    description:
      "C-Resiliens, a Swedish-owned cyber-security company, offers critical societal functions with advanced defense technology. Elevate security with user-friendly solutions that are easy to buy and easy to use",
    images: [
      {
        url: "https://cr.se/opengraph.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function Page() {
  const readMoreText = "Read More";
  const arrowIconUrl = "right-arrow.svg";

  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=6&populate=*&locale=en`;
  const response = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }

  const articlesData = await response.json();
  const articles = Array.isArray(articlesData.data) ? articlesData.data : [];

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const urlBasedOnLang = "/en/news";

  if (!articles) return <div></div>;

  return (
    <div className="news-page-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-page-content-wrapper">
              <h1>NEWS</h1>
              <div className="news-grid">
                {articles.map((article) => {
                  // Assuming article.attributes.Image.attributes.url contains the image path// This will log the image URL to the console

                  return (
                    <div className="nyheter-wrapper">
                      <a
                        href={`${urlBasedOnLang}/${article.id}`}
                        key={article.id}
                      >
                        <div className="nyheter-content-card">
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_SLIM}${article.attributes.Image.data.attributes.formats.thumbnail.url})`,
                            }}
                            className="nyheter-content-card-top"
                          ></div>

                          <div className="nyheter-content-card-bottom">
                            <div className="nyheter-content-card-text-wrapper">
                              <div className="nyheter-date">
                                {convertDateFormat(article.attributes.Date)}
                              </div>
                              <h3>{article.attributes.Titel}</h3>
                              <p className="nyheter-paragraph-one">
                                {article.attributes.ArticleText}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="nyheter-las-mer">
                          <div className="nyheter-las-mer-content">
                            <p>READ MORE</p>
                            <img src="/right-arrow.svg" alt="Read More" />
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
