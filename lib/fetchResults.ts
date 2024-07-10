import { searchParams } from "@/app/search/page";
import { Result } from "@/typings";

export async function fetchResults(searchParams: searchParams) {
    const username = process.env.OXYLABS_USERNAME;
    const password = process.env.OXYLABS_PASSWORD;

    const url = new URL(searchParams.url); //baseのURL
    Object.keys(searchParams).forEach((key)=>{
        if (key ==="url" || key === "location") return;

        const value = searchParams[key as keyof searchParams];

        if(typeof value === "string") {
            url.searchParams.append(key, value);
        }
    })
    console.log("scraping url is", url.href);


    const body = {
        source: "universal",
        url:url.href,
        parse:true,
        render:'html',
        parsing_instructions: {
            listings: {
        _fns: [
          {
            _fn: "xpath",
            _args: ["//div[@data-testid='property-card-container']"],
          },
        ],
        _items: {
          title: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[@data-testid='title']/text()"],
              },
            ],
          },
          description: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//span[@data-testid='distance']/text()",
                ],
              },
            ],
          },
          booking_metadata: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//div[contains(@class, 'c5ca594cb1 f19ed67e4b')]/div[contains(@class, 'abf093bdfe f45d8e4c32')]/text()",
                ],
              },
            ],
          },
          link: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//a[@data-testid='title-link']/@href"],
              },
            ],
          },
          price: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  `.//span[@data-testid='price-and-discounted-price']/text()`,
                ],
              },
            ],
          },
          url: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//img/@src"],
              },
            ],
          },
          rating_word: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//div[contains(@class, 'd0522b0cca') and contains(@class, 'eb02592978')]/text()",
                ],
              },
            ],
          },
          rating_count: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [".//div[contains(@class, 'e8acaa0d22') and contains(@class, 'ab107395cb') and contains(@class, 'c60bada9e4')]/text()"],
              },
            ],
          },
          rating: {
            _fns: [
              {
                _fn: "xpath_one",
                _args: [
                  ".//div[contains(@class, 'd0522b0cca')]/text()",
                ],
              },
            ],
          },
        },
      },
            total_listings: {
                _fns: [
                    {_fn: "xpath_one",
                        _args: [".//h1/text()"],
                    }
                ]
            }
        }
    };
    const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
        method: "POST",
        body: JSON.stringify(body),
        next: {
          revalidate: 60 * 60, // cache for 1 hour
        },
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
          if (data.results.length === 0) return;
          const result: Result = data.results[0];
    
          return result;
        })
        .catch((err) => console.log(err));
    
      return response;
}