import { ref, reactive } from "vue";

const images = ref([]);
let selectedImageIndex = ref(0);

export function shareImageList() {
  return { images };
}

export function shareSelectedImageIndex() {
  return { selectedImageIndex };
}

export async function initImages() {
  fetch("assets/images.json")
    .then((response) => response.json())
    .then(async (data) => {
      for (const image of data.files) {
        const src = await loadImageBytes(`assets/${image}`).catch((err) => {
          console.error(err);
          return;
        });
        images.value.push({
          src: src,
          rekResult: {},
          texResult: {},
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export const loadImageBytes = async (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], url);
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
  });
};
