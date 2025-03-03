import "react";
import { Card } from "antd";
import { FaWandSparkles } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";

function Character({ character, onDelete, onEdit }) {
  const { _id, name, age, house, year, bloodPurity, wand } = character;

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}>
        <Card
          style={{
            width: 300,
            textAlign: "justify",
          }}
          actions={[
            <RiDeleteBinFill key="delete" onClick={() => onDelete(_id)} />,
            <FaWandSparkles key="edit" onClick={() => onEdit(character)} />,
          ]}>
          <div
            className="cardTop"
            style={{
              display: "flex",
              flexDirection: "row",
            }}>
            <img
              src="/images/profileSeal.png"
              alt="Ministry Seal"
              width="65px"
              height="70px"
              draggable="false"
              style={{
                paddingBottom: "5px",
              }}
            />
            <h2>Official Wizard Profile</h2>
          </div>
          <p>
            <b>NAME:</b> {name}
          </p>
          <p>
            <b>AGE:</b> {age}
          </p>
          <p>
            <b>YEAR:</b> {year}
          </p>
          {house && (
            <p>
              <b>HOUSE:</b> {house}
            </p>
          )}
          <p>
            <b>BLOOD PURITY:</b> {bloodPurity}
          </p>
          {wand && (
            <div className="wandSelection" style={{ lineHeight: "13px" }}>
              <b>WAND:</b>
              <ul>
                <li>{wand.length}"</li>
                <li>{wand.core} core</li>
                <li>{wand.wood}</li>
              </ul>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

export default Character;
