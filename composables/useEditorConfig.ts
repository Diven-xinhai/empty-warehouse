export function useEditorConfig() {
  const toolbarConfig = {
    excludeKeys: [
      "codeBlock",
      "code",
      "codeSelectLang",
      "todo",
      "insertTable",
      "insertImage",
      "group-video",
      "insertVideo",
      "uploadVideo",
      "emotion",
      "fullScreen",
    ],
  }
  
  const editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: any, insertFn: any) {
          const isImage =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.then === 'image/gif';
          if (!isImage) {
            ElMessage.error("只能上传jpg、png、gif图片!");
            return false;
          }
  
          const isLtM = file.size / 1024 / 1024 < 10;
          if (!isLtM) {
            ElMessage.warning("上传文件大小不能超过10MB！");
            return false;
          }
  
          const formData = new FormData()
          formData.append("file", file)
          fetch(import.meta.env.VITE_GLOB_API_URL + '/iot-system/hulk-resource/oss/endpoint/put-file', {
            body: formData,
            method: 'post',
            headers: {
              'Hulk-Auth': `bearer ${getLocalStore('token')}` 
            },
          }).then(res => res.json()).then((res) => {
            const url = res.data.link;
            insertFn(url, "", "");
          });
        },
      },
      lineHeight: {
        lineHeightList: ['0', '1', '1.5', '2', '2.5']
      }
    },
  }
  
  const editorInstance = shallowRef()
  function onCreatedEditor(editor: any) {
    editorInstance.value = Object.seal(editor);
  }

  return {
    toolbarConfig,
    editorConfig,
    editorInstance,
    onCreatedEditor
  }
}