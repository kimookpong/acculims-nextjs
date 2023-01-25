import BarcodeDetail from "./BarcodeDetail";

const BarcodeComponent = (props) => {
  const { data } = props;
  return (
    <table style={{ width: "-webkit-fill-available" }}>
      <tbody>
        {data.map((element, index) => {
          return (
            <tr key={index} style={{ textAlign: "center" }}>
              <td>
                <BarcodeDetail element={element} key={index} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BarcodeComponent;
