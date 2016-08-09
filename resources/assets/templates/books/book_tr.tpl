<td><%- title %></td>
<td><%- author %></td>
<td><%- genre %></td>
<td><%- year %></td>
<td> <% if(user.firstname) { %> <a class="btn btn-primary btn-xs js-show-user"><%- user.firstname %> <%-
        user.lastname %> <a style="cursor:pointer;" class="btn btn-primary btn-xs js-return-book">Return</a> <% } %></a>
</td>
<td>
    <button class="btn btn-small btn-success js-show">Show</button>
    <button class="btn btn-small btn-warning js-edit">Edit</button>

    <button class="btn btn-small btn-danger pull-right js-delete">Delete</button>
</td>
