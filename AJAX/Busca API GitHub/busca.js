var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var todos = JSON.parse(localStorage.getItem("list_todos")) || []; 

function renderTodos(){

    listElement.innerHTML = '';

    for (todo of todos){

        var todoElement = document.createElement("li");
        var todoText = document.createTextNode(todo);



        var pos = todos.indexOf(todo);

        var linkElement = document.createElement("a");
        var linkText = document.createTextNode(' Excluir');
        
        
        linkElement.setAttribute('href','#');
        linkElement.setAttribute('onclick', 'deleteTodo('+ pos +')');
        

        linkElement.appendChild(linkText);
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
};

renderTodos();

function addTodo(){
        var todoText = inputElement.value;

        todos.push(todoText);
        inputElement.value = '';


        axios.get('https://api.github.com/users/'+todoText+'/repos')
            .then(function(response){
            console.log(response);
            var gitHub = document.createElement('p');
            var gitHubText = document.createTextNode(JSON.stringify(response.data));
            gitHub.appendChild(gitHubText);
            listElement.appendChild(gitHub);
            })
            .catch(function(error){
            console.warn(error);
            var gitHubError = document.createElement('p');
            var gitHubTextError = document.createTextNode('O usuário solicitado não existe.');
            gitHubError.appendChild(gitHubTextError);
            listElement.appendChild(gitHubError);
            });

        
        renderTodos();
        saveToStorage();
};

buttonElement.onclick = addTodo;

function deleteTodo(pos){
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
};

function saveToStorage(){
    localStorage.setItem("list_todos", JSON.stringify(todos));
};

axios.interceptors.request.use(function (config) {

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator');
  
    const token = window.localStorage.token;
    if (token) {
       config.headers.Authorization = `token ${token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error);
  });
  
  axios.interceptors.request.use(function (config) {

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator');
  
    const token = window.localStorage.token;
    if (token) {
       config.headers.Authorization = `token ${token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(function (response) {
  
    // spinning hide
    // UPDATE: Add this code to hide global loading indicator
    document.body.classList.remove('loading-indicator');
  
    return response;
  }, function (error) {
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  });