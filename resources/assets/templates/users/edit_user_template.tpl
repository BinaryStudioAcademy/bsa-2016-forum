<div class="messages" style="min-height: 40px;">

</div>
<form>
    <input class="form-control" name="id" type="hidden" value="<%- id %>">
    <div class="form-group">
        <label for="">First Name</label>
        <input class="form-control" id="firstname" name="firstname" type="text" value="<%- firstname %>">
    </div>
    <div class="form-group">
        <label for="">Last Name</label>
        <input class="form-control" name="lastname" type="text" value="<%- lastname %>">
    </div>

    <div class="form-group">
        <label for="">Email</label>
        <input class="form-control" name="email" type="text" value="<%- email %>">
    </div>
    <input class="btn btn-primary js-save" type="submit" value="Save">
</form>