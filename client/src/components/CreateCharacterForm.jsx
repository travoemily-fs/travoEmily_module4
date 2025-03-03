import "react";
import { useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import API from "../API/index";

const CreateCharacterForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  // hook for validation
  const [form] = Form.useForm();

  // handles form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // calls api for create(post)
      await API.createCharacter(values);
      message.success("Character created successfully!");
      form.resetFields(); // resets fields
      onSuccess(); // e.g. refreshes character list
      onClose(); // closes modal
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to create character."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add new Witch or Wizard to Ministry database."
      open={isOpen}
      onCancel={onClose}
      footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}>
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
          rules={[{ required: true, message: "Blood purity is required" }]}>
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
            Create profile
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCharacterForm;
