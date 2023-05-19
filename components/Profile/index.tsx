import PromptCard from '@components/PromptCard';

interface ProfileProps {
  name: String;
  desc: String;
  data: any[];
  handleEdit: (prompt: any) => void;
  handleDelete: (prompt: any) => void;
}

const Profile = (props: ProfileProps) => {
  const { name, desc, data, handleEdit, handleDelete } = props;

  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout ">
        {data.map((prompt: any) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit(prompt)}
            handleDelete={() => handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
