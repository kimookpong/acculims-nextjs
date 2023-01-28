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
        <Link href="/lab_report">รายงานผล LAB</Link>
      </li>
    </ul>
  );
}

export default Home;
