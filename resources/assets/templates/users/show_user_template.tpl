<div class="form-group">
    <label for="">First Name</label>
    <input class="form-control" readonly="readonly" name="firstname" type="text" value="<%- firstname %>">
</div>
<div class="form-group">
    <label for="">Last Name</label>
    <input class="form-control" readonly="readonly" name="lastname" type="text" value="<%- lastname %>">
</div>

<div class="form-group">
    <label for="">Email</label>
    <input class="form-control" readonly="readonly" name="email" type="text" value="<%- email %>">
</div>
<button class="btn btn-primary js-edit">Edit</button>

<table class="table table-striped table-hover table-bordered"><br><br>
    <thead>
    <td>Book info:</td>
    </thead>
    <tbody>
    <% _.each(books, function(book, key) { %>
    <tr>
        <td><%- book.title %> - <%- book.author %> - <%- book.genre %> - <%- book.year %></td>

    </tr>
    <% }); %>
    </tbody>
</table>