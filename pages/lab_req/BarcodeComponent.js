import BarcodeDetail from "./BarcodeDetail";

const BarcodeComponent = (props) => {
  const { data, seperate } = props;
  console.log(data);
  // const [sAddress, setSAddress] = useState(null);
  return (
    <table style={{ width: "-webkit-fill-available" }}>
      <tbody>
        {!!data ? (
          !!data.result ? (
            data.result.map((element, index) => {
              return (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>
                    <BarcodeDetail
                      element={element}
                      key={index}
                      seperate={seperate}
                      lab_items_name={
                        data.lab_items_name[element["order_number"]]
                      }
                      fbs={false}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        {!!data ? (
          !!data.fbs && seperate ? (
            data.fbs.map((element, index) => {
              return (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>
                    <BarcodeDetail
                      element={element}
                      key={index}
                      seperate={seperate}
                      lab_items_name={
                        data.lab_items_name_fbs[element["order_number"]]
                      }
                      fbs={true}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </tbody>
    </table>
  );
};

export default BarcodeComponent;
