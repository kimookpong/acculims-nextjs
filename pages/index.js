import Link from "next/link";
function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/lab_req">ใบรับ LAB</Link>
      </li>
      <li>
        <Link href="/lab_report">Blog Post</Link>
      </li>
    </ul>
  );
}

export default Home;
