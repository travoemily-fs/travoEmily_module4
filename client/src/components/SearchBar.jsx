import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { GiMagnifyingGlass, GiPolarStar } from "react-icons/gi";
import { IoSparklesSharp } from "react-icons/io5";

export default function SearchBar({ onSearch, onShowAll, onCreate }) {
  const [term, setTerm] = useState("");

  const handleSubmit = () => {
    if (!term.trim()) {
      message.error(
        "Please enter the name of the Witch or Wizard you are searching for in order to proceed."
      );
      return;
    }
    onSearch(term);
  };

  /*     NOTE ON FORM CONTROL.... 
  ant design (the framework i installed) provides its own form control system that handles events for us... antd calls it's onFinish callback and returns an object that holds the form input fiends. because we needed to showcase useState, i got rid of antd's default form control functions and the changes are handled manually by using <input> inside of antd's form wrapper.  */

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      autoComplete="off"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: ".5rem",
        maxWidth: 1000,
      }}>
      <div style={{ marginBottom: "1rem" }}>
        <Button type="default" onClick={onShowAll} style={{ width: "120px" }}>
          show all
          <GiPolarStar style={{ fontSize: ".8rem" }} />
        </Button>
        <Button
          type="default"
          onClick={onCreate}
          style={{
            width: "130px",
            marginLeft: "5px",
          }}>
          create new
          <IoSparklesSharp style={{ fontSize: ".8rem" }} />
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        <Form.Item style={{ marginRight: ".5rem", width: "340px" }}>
          <Input
            placeholder="ie: Harry Potter"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Form.Item>
        <Form.Item style={{ marginRight: 0 }}>
          <Button type="primary" htmlType="submit" style={{ width: "110px" }}>
            search
            <GiMagnifyingGlass style={{ fontSize: ".8rem" }} />
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
