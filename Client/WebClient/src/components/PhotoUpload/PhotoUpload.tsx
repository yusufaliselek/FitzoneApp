import React from 'react'
import { MdEdit } from 'react-icons/md'
import doe from '../../assets/doe.png'

const PhotoUpload = ({ photo }: { photo: string }) => {
    return (
        <div>

            <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={photo ? photo : doe}
                />
                <label
                    htmlFor="pictureInput"
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white bg-opacity-50 flex items-center justify-center cursor-pointer shadow-md mr-2 mb-2"
                >
                    <MdEdit />
                    <input
                        id="pictureInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                    />
                </label>
            </div>

        </div>
    )
}

export default PhotoUpload