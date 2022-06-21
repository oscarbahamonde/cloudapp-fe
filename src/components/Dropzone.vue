<template>
  <div ref="el" :style="style" style="position: fixed">
    <div>
      <div class="dropzone-container">
        <input
          type="file"
          id="files"
          name="files"
          ref="files"
          multiple
          accept="*/*"
          enctype="multipart/form-data"
          @change="handleFiles"
          class="hidden"
        />
        <label for="files" class="dropzone">
          <div v-if="fileList.length > 0">
            <Icon
              icon="mdi-delete"
              @click.prevent="fileList = []"
              right-2
              top-2
              absolute
              hover:text-red-500
              cursor-pointer
            />
          </div>
          {{
            fileList.length > 0
              ? fileList.length + " files selected"
              : "Click to upload files"
          }}
          <div v-if="fileList.length > 0">
            <Icon icon="mdi-upload" class="upload_icon" @click.prevent="uploadFiles" />
          </div>
        </label>
      </div>
    </div>
  </div>
  <div class="preview-container">
    <div v-for="file in fileList" bg-teal-500 rounded p-2 m-2 w-48 h-64 col items-center>
      <div col items-center>
        <Icon
          icon="mdi-delete"
          @click="removeFile(file)"
          text
          ml-40
          hover:text-red-500
          cursor-pointer
        />
        <h1 text-xs font-bold text-center font-sans>
          {{ file.name }}
        </h1>
        <h2 text-xs text-center font-serif>
          {{ new Date(file.lastModified).toLocaleString() }}
        </h2>
      </div>
      <div>
        <h2 text-xs text-center font-mono>
          {{
            file.size < 1024 * 1024
              ? (file.size / 1024).toFixed(2) + "KB"
              : (file.size / 1024 / 1024).toFixed(2) + "MB"
          }}
        </h2>
        <h3 text-xs text-center font-sans>
          {{ file.type }}
        </h3>
        <div>
          <div col items-center v-if="file.type.startsWith('image')">
            <img :src="file.preview" h-32 />
          </div>
          <div col items-center v-else-if="file.type.startsWith('video')">
            <video :src="file.preview" />
          </div>
          <div col items-center v-else-if="file.type.startsWith('audio')">
            <audio :src="file.preview" />
          </div>
          <div col items-center v-else-if="file.type.startsWith('application/pdf')">
            <iframe :src="file.preview" />
          </div>
          <div col items-center v-else>
            <Icon icon="mdi-file" w-32 h-32 />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropzone-container {
  @apply flex justify-center h-full;
}

.dropzone {
  @apply h-32 w-96 bg-teal-500 col;
  @apply justify-center items-center;
  @apply rounded shadow-lg shadow-gray-500;
  @apply hover:border-2 hover:border-black hover:border-dashed;
  @apply hover:cursor-move hover:bg-white hover:shadow-black hover:text-black;
  @apply transition-all duration-200 ease-in-out;
  @apply text-xs;
}

.upload_icon {
  @apply h-12 w-12 
  @apply text-black border-2 border-black;
  @apply hover:scale-125 hover:transition-all hover:ease-in-out 
  @apply cursor-pointer rounded-full;
  @apply mt-4;
  @apply hover:bg-black hover:text-white;
}
</style>
<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { useUserStore } from "~/store/user";

const { setUser, getUser } = useUserStore();

const fileList = ref([]);
const el = ref<HTMLElement | null>(null);
const { x, y, style } = useDraggable(el, {
  draggable: true,
  handle: el,
  onDrag: (e) => {
    e.target.style.transform = `translate(${x}px, ${y}px)`;
  },
});
const endpoint = "/api/api/media";
const handleFiles = (e: Event) => {
  Array.from(e.target.files || []).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      fileList.value.push({
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
        preview: e.target.result,
      });
    };
    reader.readAsDataURL(file);
  });
};
const removeFile = (file: File) => {
  fileList.value = fileList.value.filter((f) => f !== file);
};

const uploadFiles = async () => {
  var responses = [];
  try {
    fileList.value.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user", getUser());
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      responses.push(await response.json());
      alert("pushed");
    });
  } catch (e) {
    alert("failed");
  }
  fileList.value = [];
  return responses;
  alert("success");
};
</script>
