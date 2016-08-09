<div id="messages2" style="min-height: 40px;">

</div>
<form>
    <input class="form-control" name="id" type="hidden" value="<%- id %>">
    <div class="form-group">
        <label for="">Title</label>
        <input class="form-control" name="title" type="text" value="<%- title %>">
    </div>
    <div class="form-group">
        <label for="">Author</label>
        <input class="form-control" name="author" type="text" value="<%- author %>">
    </div>

    <div class="form-group">
        <label for="">Genre</label>
        <input class="form-control" name="genre" type="text" value="<%- genre %>">
    </div>
    <div class="form-group">
        <label for="">Year</label>
        <input class="form-control" name="year" type="text" value="<%- year %>">
    </div>
    <input class="btn btn-primary js-save" type="submit" value="Save">
</form>