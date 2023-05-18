interface FormProps {
  type: string;
  post: any;
  setPost: (object: any) => void;
  handleSubmit: (e: any) => void;
}

const Form = (props: FormProps) => {
  const { type, post, setPost, handleSubmit } = props;

  return (
    <section
      className="w-full max-w-full flex-start flex-col"
    >
      <h1 className="head_text text-left">
    <span  className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {  type } and share amazing prompt with world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form onSubmit={handleSubmit}
      className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                  Your AI Prompt
              </span>
              <textarea value={post.prompt}
              onChange={e => setPost({
                ...post, 
                prompt: e.target.value
              })}
              
              required
              placeholder="Write your prompt here..."
              className="form_textarea"/>
            </label>
      </form>
    </section>
  );
};

export default Form;
