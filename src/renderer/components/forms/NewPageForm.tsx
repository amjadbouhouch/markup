import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dbService from 'renderer/database/dbService';
// <!-- Put this part before </body> tag -->
const NewPageForm = () => {
  const navigate = useNavigate();
  const [pageName, setPageName] = useState('');
  const onSubmit = async () => {
    try {
      const page = pageName.trim();
      if (!page) navigate(-1);
      const id = await dbService.createPage(page);
      navigate(`${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal" id="add-page-modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">New page</h3>

        <input
          type="text"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
          placeholder="anything..."
          className="w-full max-w-xs my-4 input input-bordered"
        />

        <div className="modal-action">
          <a type="button" href="#" className="btn">
            Close
          </a>
          <button onClick={onSubmit} type="button" className="btn btn-primary">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPageForm;
