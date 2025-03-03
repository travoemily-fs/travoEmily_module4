import "react";
import { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import API from "../API/index";

function EditCharacterForm({ isOpen, onClose, onSuccess, character }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // pre fill the form fields with existing data on open
  useEffect(() => {
    if (character) {
      // make sure you build out wand as an object
      form.setFieldsValue({
        name: character.name,
        age: character.age,
        house: character.house,
        year: character.year,
        bloodPurity: character.bloodPurity,
        wand: {
          length: character.wand?.length,
          core: character.wand?.core,
          wood: character.wand?.wood,
        },
      });
    }
  }, [character, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await API.updateCharacter(character._id, values);
      message.success("Profile updated successfully!");
      onSuccess();
      onClose();
      form.resetFields();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Edit Wizard" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Age is required" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="House"
          name="house"
          rules={[{ required: true, message: "House is required" }]}>
          <Select>
            <Select.Option value="Gryffindor">Gryffindor</Select.Option>
            <Select.Option value="Slytherin">Slytherin</Select.Option>
            <Select.Option value="Ravenclaw">Ravenclaw</Select.Option>
            <Select.Option value="Hufflepuff">Hufflepuff</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Year is required" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Blood Purity"
          name="bloodPurity"
          rules={[{ required: true, message: "Blood Purity is required" }]}>
          <Select>
            <Select.Option value="pureblood">pureblood</Select.Option>
            <Select.Option value="halfblood">halfblood</Select.Option>
            <Select.Option value="muggle born">muggle born</Select.Option>
            <Select.Option value="squib">squib</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Wand Length"
          name={["wand", "length"]}
          rules={[{ required: true, message: "Wand length is required" }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Wand Core"
          name={["wand", "core"]}
          rules={[{ required: true, message: "Wand core is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Wand Wood"
          name={["wand", "wood"]}
          rules={[{ required: true, message: "Wand wood is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditCharacterForm;
