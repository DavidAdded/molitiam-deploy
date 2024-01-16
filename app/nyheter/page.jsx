import "./page.css";

export default async function Page() {
  const articlesURL = `${process.env.NEXT_PUBLIC_API_URL}articles?sort=Date:desc&pagination[limit]=6z&populate=*&locale=sv`;
  const articlesResponse = await fetch(articlesURL, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  if (!articlesResponse.ok) {
    throw new Error(`Failed to fetch articles: ${articlesResponse.statusText}`);
  }

  const articlesData = await articlesResponse.json();
  const articles = Array.isArray(articlesData.data) ? articlesData.data : [];

  function convertDateFormat(dateString) {
    return dateString.replace(/-/g, "•");
  }

  const urlBasedOnLang = "/nyheter";

  if (!articles) return <div></div>;

  return (
    <div className="news-page-section-wrapper">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            <div className="nyheter-page-content-wrapper">
              <h1>nyheter</h1>
              <div className="news-grid">
                {articles.map((article) => {
                  return (
                    <div className="nyheter-wrapper">
                      <a
                        href={`${urlBasedOnLang}/${article.id}`}
                        key={article.id}
                      >
                        <div className="nyheter-content-card">
                          <div
                            style={{
                              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_SLIM}${article.attributes.Image.data.attributes.formats.medium.url})`,
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
                            <p>LÄS MER</p>
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
