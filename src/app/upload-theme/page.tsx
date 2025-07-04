'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { apiService } from '@/lib/api';

interface UploadFormData {
  name: string;
  short_description: string;
  description: string;
  tags: string;
  bgm_info: string;
}

interface UploadFiles {
  body_LZ_bin: File | null;
  bgm_bcstm: File | null;
  preview_png: File | null;
  icon_png: File | null;
}

interface UploadErrors {
  [key: string]: string | undefined;
}

function UploadThemeContent() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    name: '',
    short_description: '',
    description: '',
    tags: '',
    bgm_info: ''
  });
  const [files, setFiles] = useState<UploadFiles>({
    body_LZ_bin: null,
    bgm_bcstm: null,
    preview_png: null,
    icon_png: null
  });
  const [errors, setErrors] = useState<UploadErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: keyof UploadFiles) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
    }
  };

  const validateForm = () => {
    const newErrors: UploadErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Theme name is required';
    if (!formData.short_description.trim()) newErrors.short_description = 'Short description is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!files.body_LZ_bin) newErrors.body_LZ_bin = 'Body LZ file is required';
    if (!files.bgm_bcstm) newErrors.bgm_bcstm = 'BGM file is required';
    if (!files.preview_png) newErrors.preview_png = 'Preview image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('short_description', formData.short_description);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('bgm_info', formData.bgm_info);
      if (files.body_LZ_bin) formDataToSend.append('body_LZ_bin', files.body_LZ_bin);
      if (files.bgm_bcstm) formDataToSend.append('bgm_bcstm', files.bgm_bcstm);
      if (files.preview_png) formDataToSend.append('preview_png', files.preview_png);
      if (files.icon_png) formDataToSend.append('icon_png', files.icon_png);
      const result = await apiService.uploadTheme(formDataToSend);
      router.push(`/themes/${result.theme_id}`);
    } catch (error) {
      setErrors({ submit: (error as Error).message || 'Upload failed' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Share Your Theme
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Upload your custom Nintendo 3DS theme and share it with the community
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] rounded-lg p-8">
              <h2 className="text-2xl font-light text-white mb-6">Theme Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Theme Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Enter a descriptive name for your theme"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="short_description" className="block text-sm font-medium text-gray-300 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    id="short_description"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="Brief description (max 200 characters)"
                    maxLength={200}
                  />
                  {errors.short_description && <p className="text-red-400 text-sm mt-1">{errors.short_description}</p>}
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                    placeholder="Describe your theme, its features, and any special notes..."
                  ></textarea>
                  {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="gaming, anime, dark (comma separated)"
                    />
                  </div>
                  <div>
                    <label htmlFor="bgm_info" className="block text-sm font-medium text-gray-300 mb-2">
                      BGM Information
                    </label>
                    <input
                      type="text"
                      id="bgm_info"
                      name="bgm_info"
                      value={formData.bgm_info}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="Background music details"
                    />
                  </div>
                </div>
                {/* Body LZ File */}
                <div>
                  <label htmlFor="body_LZ_bin" className="block text-sm font-medium text-gray-300 mb-2">
                    Body LZ File (.bin) *
                  </label>
                  <label htmlFor="body_LZ_bin" className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-300 mb-2">Click to upload body_LZ.bin file</p>
                    <p className="text-sm text-gray-400">Binary theme file, max 10MB</p>
                    <input 
                      type="file" 
                      id="body_LZ_bin" 
                      className="hidden" 
                      accept=".bin"
                      onChange={(e) => handleFileChange(e, 'body_LZ_bin')}
                    />
                  </label>
                  {files.body_LZ_bin && (
                    <p className="text-emerald-400 text-xs mt-2">
                      Selected: {files.body_LZ_bin.name}
                    </p>
                  )}
                  {errors.body_LZ_bin && <p className="text-red-400 text-sm mt-1">{errors.body_LZ_bin}</p>}
                </div>
                {/* BGM File */}
                <div>
                  <label htmlFor="bgm_bcstm" className="block text-sm font-medium text-gray-300 mb-2">
                    BGM File (.bcstm) *
                  </label>
                  <label htmlFor="bgm_bcstm" className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-300 mb-2">Click to upload bgm.bcstm file</p>
                    <p className="text-sm text-gray-400">Audio file, max 10MB</p>
                    <input 
                      type="file" 
                      id="bgm_bcstm" 
                      className="hidden" 
                      accept=".bcstm"
                      onChange={(e) => handleFileChange(e, 'bgm_bcstm')}
                    />
                  </label>
                  {files.bgm_bcstm && (
                    <p className="text-emerald-400 text-xs mt-2">
                      Selected: {files.bgm_bcstm.name}
                    </p>
                  )}
                  {errors.bgm_bcstm && <p className="text-red-400 text-sm mt-1">{errors.bgm_bcstm}</p>}
                </div>
                {/* Preview Image */}
                <div>
                  <label htmlFor="preview_png" className="block text-sm font-medium text-gray-300 mb-2">
                    Preview Image (.png) *
                  </label>
                  <label htmlFor="preview_png" className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-300 mb-2">Upload a preview image</p>
                    <p className="text-sm text-gray-400">PNG format, max 5MB</p>
                    <input 
                      type="file" 
                      id="preview_png" 
                      className="hidden" 
                      accept=".png"
                      onChange={(e) => handleFileChange(e, 'preview_png')}
                    />
                  </label>
                  {files.preview_png && (
                    <p className="text-emerald-400 text-xs mt-2">
                      Selected: {files.preview_png.name}
                    </p>
                  )}
                  {errors.preview_png && <p className="text-red-400 text-sm mt-1">{errors.preview_png}</p>}
                </div>
                {/* Icon Image */}
                <div>
                  <label htmlFor="icon_png" className="block text-sm font-medium text-gray-300 mb-2">
                    Icon Image (.png) - Optional
                  </label>
                  <label htmlFor="icon_png" className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer block">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-gray-300 mb-2">Upload an icon image (optional)</p>
                    <p className="text-sm text-gray-400">PNG format, max 2MB. Default icon will be used if not provided.</p>
                    <input 
                      type="file" 
                      id="icon_png" 
                      className="hidden" 
                      accept=".png"
                      onChange={(e) => handleFileChange(e, 'icon_png')}
                    />
                  </label>
                  {files.icon_png && (
                    <p className="text-emerald-400 text-xs mt-2">
                      Selected: {files.icon_png.name}
                    </p>
                  )}
                </div>
                {errors.submit && (
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                    <p className="text-red-400">{errors.submit}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  {isUploading ? 'Uploading...' : 'Upload Theme'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">Upload Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Ensure all required files are properly formatted</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Provide a clear, descriptive name and description</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Test your theme before uploading</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Include a high-quality preview image</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>Respect copyright and intellectual property</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">File Requirements</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Body LZ File:</strong> .bin format, max 10MB</p>
                <p><strong>BGM File:</strong> .bcstm format, max 10MB</p>
                <p><strong>Preview Image:</strong> PNG format, max 5MB</p>
                <p><strong>Icon Image:</strong> PNG format, max 2MB (optional)</p>
                <p><strong>Compatibility:</strong> Nintendo 3DS/2DS</p>
              </div>
            </div>

            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h3 className="text-xl font-light text-white mb-4">Need Help?</h3>
              <p className="text-sm text-gray-300 mb-4">
                New to theme creation? Check out our guides and tutorials.
              </p>
              <button className="w-full px-4 py-2 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-colors duration-200 text-sm">
                View Tutorials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadThemePage() {
  return (
    <ProtectedRoute>
      <UploadThemeContent />
    </ProtectedRoute>
  );
}
  