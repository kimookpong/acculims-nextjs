import { React } from "react";
import { Layout, Space } from "antd";
import MenuItem from "./layout/MenuItem";

import { SessionProvider, useSession } from "next-auth/react";
import "../public/css/styles.css";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
            size={[0, 48]}
          >
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <MenuItem />
              <Layout
                className="site-layout"
                style={{
                  margin: "8px",
                }}
              >
                <Component {...pageProps} />
              </Layout>
            </Layout>
          </Space>
        </Auth>
      ) : (
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 48]}
        >
          <Layout
            style={{
              minHeight: "100vh",
            }}
          >
            <MenuItem />
            <Layout
              className="site-layout"
              style={{
                margin: "8px",
              }}
            >
              <Component {...pageProps} />
            </Layout>
          </Layout>
        </Space>
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });
  console.log(true);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
