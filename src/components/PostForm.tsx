import React, { useState } from 'react';
import classNames from 'classnames';

import { Post } from '../types/Post';
import { User } from '../types';

type Props = {
  onSubmit: (post: Post) => void;
  onReset?: () => void;
  post?: Post | null;
  fixedUserId?: number;
  users: User[];
};

export const PostForm: React.FC<Props> = ({ 
  onSubmit, 
  onReset = () => {},
  post,
  fixedUserId = 0,
  users=[],
}) => {
  // #region state
  const [title, setTitle] = useState(post?.title || '');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(post?.userId || fixedUserId);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  
  const [body, setBody] = useState(post?.body || '');
  const [bodyErrorMessage, setBodyErrorMessage] = useState('');
  // #endregion
  // #region handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyErrorMessage('');
  };
  // #endregion
  const handleSubmit = (event: React.FormEvent) => {
    // #region validation
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!body) {
      setBodyErrorMessage('Please enter some text');
    } else if (body.length < 5) {
      setBodyErrorMessage('Body should have at least 5 chars');
    }

    if (!title || !userId || body.length < 5) {
      return;
    }
    // #endregion

    const id = post?.id || 0;

    onSubmit({ id, title, body, userId });

    reset();
  };
  // #region reset
  const reset = () => {
    setTitle('');
    setUserId(fixedUserId);
    setBody('');

    setHasTitleError(false);
    setHasUserIdError(false);
    setBodyErrorMessage('');

    onReset();
  };
  // #endregion

  return (
    <form
      action="/api/posts" 
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title is-5">
        {post ? 'Edit a post' : 'Create a post'}
      </h2>

      <div className="field">
        <label className="label" htmlFor="post-title">
          Title
        </label>

        <div className={classNames('control', {
          'has-icons-right': hasTitleError,
        })}>
          <input
            id="post-title"
            className={classNames('input', {
              'is-danger': hasTitleError
            })} 
            type="text" 
            placeholder="Enter title" 
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fas fa-exclamation-triangle has-text-danger"></i>
            </span>
          )}
        </div>

        {hasTitleError && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="post-user-id">
          Subject
        </label>

        <div className="control has-icons-left">
          <div className={classNames('select', {
            'is-danger': hasUserIdError,
          })}>
            <select
              id="post-user-id"
              value={userId}
              onChange={handleUserIdChange}
              disabled={fixedUserId !== 0}
            >
              <option value="0">Select a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>

        {hasUserIdError && (
          <p className="help is-danger">Please select a user</p>
        )}
      </div>

      <div className="field">
        <label className="label">
          Message
        </label>

        <div className="control">
          <textarea 
            className={classNames('textarea', {
              'is-danger': bodyErrorMessage,
            })} 
            placeholder="At least 5 characters"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
        </div>

        {bodyErrorMessage && (
          <p className="help is-danger">{bodyErrorMessage}</p>
        )}
      </div>

      <div className="buttons">
        <button type="submit" className="button is-link">
          {post ? 'Save' : 'Create'}
        </button>

        <button type="reset" className="button is-link is-light">
          Cancel
        </button>
      </div>
    </form>
  );
};