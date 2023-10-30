tinymce.init({
    selector: '#textarea-tinymce',
    plugins: [
      'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
      'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
      'table', 'emoticons', 'template', 'help'
    ],
    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link | print preview fullscreen | ' +
      'forecolor backcolor emoticons | help',
    menu: {
      favs: { title: 'Blog content', items: 'code visualaid | searchreplace | emoticons' }
    },
    menubar: 'favs file edit view format tools help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    content_css:'styles/text-area.css'
  });