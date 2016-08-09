<div class="form-group">
    <label for="">Title</label>
    <input class="form-control" readonly="readonly" name="title" type="text" value="<%- title %>">
</div>
<div class="form-group">
    <label for="">Author</label>
    <input class="form-control" readonly="readonly" name="author" type="text" value="<%- author %>">
</div>

<div class="form-group">
    <label for="">Genre</label>
    <input class="form-control" readonly="readonly" name="genre" type="text" value="<%- genre %>">
</div>
<div class="form-group">
    <label for="">Year</label>
    <input class="form-control" readonly="readonly" name="year" type="text" value="<%- year %>">
</div>
<button class="btn btn-primary js-edit">Edit</button>
<% if(user_id != 0)  { %>
<button class="btn btn-primary js-return">Return book</button> <% } %>