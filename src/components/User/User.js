import React from 'react'

const User = ({ user }) => {
  const {created_at, updated_at} = user
  let createdAt = new Date(created_at)
  let updatedAt = new Date(updated_at)
  return (
    <div className='media col-lg-10 mt-5 py-3 mx-auto'>
      <img src={user.avatar_url} alt={user.name} className='rounded-circle mr-3' width='100' />
      <div className='media-body text-left'>
        {user.name && (
          <h3> {user.name} </h3>
        )}
        <table className='table table-borderless'>
          <tbody>
          {user.bio && (
            <tr>
              <th scope="row" width="150"> Bio: </th>
              <td> {user.bio} </td>
            </tr>
          )}
          {user.company && (
            <tr>
              <th scope="row" width="150"> Company: </th>
              <td> {user.company} </td>
            </tr>
          )}
          <tr>
            <th scope="row" width="150"> Created At: </th>
            <td> {createdAt.toLocaleDateString()} </td>
          </tr>
          <tr>
            <th scope="row" width="150"> Updated At: </th>
            <td> {updatedAt.toLocaleDateString()} </td>
          </tr>
          {user.email && (
            <tr>
              <th scope="row" width="150">
                Email:
              </th>
              <td>{user.email}</td>
            </tr>
          )}
          </tbody>
        </table>
        <a href={`/users/${user.id}`} className="btn btn-info stretched-link">See me now &rsaquo; </a>
      </div>
    </div>
  )
}

export default User