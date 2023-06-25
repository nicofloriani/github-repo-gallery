//Div where profile information will appear
const overview = document.querySelector(".overview");
//Github username
const username = "nicofloriani";
//Repo list
const repoList = document.querySelector(".repo-list");

//Fetch user data
const githubUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    //console.log(data);
    displayUserInfo(data);
};

githubUserInfo();

//Fetch & display user information
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    overview.append(div);
    gitRepos();
};

//Fetch repos
const gitRepos = async function () {
    const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await getRepos.json();
    displayRepos(repoData);
};

//Display info about repos
const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};