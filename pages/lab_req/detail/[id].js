import { useRouter } from "next/router";
const LabReq = () => {
  const router = useRouter();
  const id = router.query.id;
  return <>{id}</>;
};
export default LabReq;
