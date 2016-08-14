<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <?php if(env('APP_DEBUG')): ?>
        <link type="text/css" rel="stylesheet" href="css/styles.css?v=<?php echo e(time()); ?>">
    <?php else: ?>
        <link type="text/css" rel="stylesheet" href="css/styles.css?v=<?php echo e(env('APP_VER')); ?>">
    <?php endif; ?>
    <title>Title</title>
</head>
<body>

<?php if(env('APP_DEBUG')): ?>
    <script src="js/bundle.js?v=<?php echo e(time()); ?>"></script>
<?php else: ?>
    <script src="js/bundle.js?v=<?php echo e(env('APP_VER')); ?>"></script>
<?php endif; ?>
</body>
</html>
