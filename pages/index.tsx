import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Home({ urlList }: any) {
  const [data, setData] = useState(urlList);
  const [newUrl, setNewUrl] = useState("");

  //on submit form call post API
  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const _newUrl = newUrl;
    setNewUrl("");
    const response = await fetch("/api/url", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url: _newUrl }),
    });

    const content = await response.json();
    if (content) {
      //add new url above all previous urls
      setData([content, ...data]);
    }
  };

  return (
    <>
      <Head>
        <title>Url-Shorten</title>
      </Head>
      <main className="content">
        <div className="container">
          <h2 className="mb-3">URL-Shorten</h2>
          <form className="mb-3" onSubmit={handleOnSubmit}>
            <input
              type="text"
              className="w-75"
              placeholder="Enter long url..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <button type="submit" className="btn btn-dark mx-2">
              Create Short Url
            </button>
          </form>
          <div></div>

          <div className="table-responsive custom-table-responsive">
            <table className="table custom-table">
              <thead>
                <tr>
                  <th scope="col">Long URL</th>
                  <th scope="col">Short URL</th>
                  <th scope="col">Clicked</th>
                </tr>
              </thead>
              <tbody>
                {data.map((urlObject: any) => (
                  <React.Fragment key={urlObject.code}>
                    <tr>
                      {/* <tr scope="row"> */}
                      <td>
                        {
                          <Link href={urlObject.url}>
                            {urlObject.url.slice(0, 120)}
                            {urlObject.url.length > 120 ? "..." : ""}
                          </Link>
                        }
                      </td>
                      <td>
                        <Link target="blank" href={`/api/${urlObject.code}`}>
                          {urlObject.code}
                        </Link>
                      </td>
                      <td>{urlObject.clicked}</td>
                    </tr>
                    <tr className="spacer">
                      <td colSpan={3}></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  //call api on load
  const res = await fetch("http://localhost:3000/api/url");
  const urlList = await res.json();

  return {
    props: {
      urlList,
    },
  };
}
