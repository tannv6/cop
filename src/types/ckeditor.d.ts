// src/types/ckeditor.d.ts

// Declare all CKEditor type modules
declare module '@ckeditor/ckeditor5-adapter-ckfinder';
declare module '@ckeditor/ckeditor5-autoformat';
declare module '@ckeditor/ckeditor5-basic-styles';
declare module '@ckeditor/ckeditor5-block-quote';
declare module '@ckeditor/ckeditor5-ckfinder';
declare module '@ckeditor/ckeditor5-cloud-services';
declare module '@ckeditor/ckeditor5-easy-image';
declare module '@ckeditor/ckeditor5-editor-classic';
declare module '@ckeditor/ckeditor5-essentials';
declare module '@ckeditor/ckeditor5-heading';
declare module '@ckeditor/ckeditor5-image';
declare module '@ckeditor/ckeditor5-indent';
declare module '@ckeditor/ckeditor5-link';
declare module '@ckeditor/ckeditor5-list';
declare module '@ckeditor/ckeditor5-media-embed';
declare module '@ckeditor/ckeditor5-paragraph';
declare module '@ckeditor/ckeditor5-paste-from-office';
declare module '@ckeditor/ckeditor5-table';
declare module '@ckeditor/ckeditor5-typing';

// Main modules
declare module '@ckeditor/ckeditor5-build-classic' {
  const ClassicEditor: any;
  export default ClassicEditor;
}

declare module '@ckeditor/ckeditor5-react' {
  export const CKEditor: any;
}