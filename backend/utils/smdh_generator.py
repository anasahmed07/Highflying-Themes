import struct
from typing import List, Tuple
from PIL import Image
import io
import logging

logger = logging.getLogger(__name__)

# SMDH constants
SMDH_SIZE = 14016
SMDH_MAGIC = 0x48444d53  # "SMDH"
TILE_ORDER = [
    0, 1, 8, 9, 2, 3, 10, 11, 16, 17, 24, 25, 18, 19, 26, 27,
    4, 5, 12, 13, 6, 7, 14, 15, 20, 21, 28, 29, 22, 23, 30, 31,
    32, 33, 40, 41, 34, 35, 42, 43, 48, 49, 56, 57, 50, 51, 58, 59,
    36, 37, 44, 45, 38, 39, 46, 47, 52, 53, 60, 61, 54, 55, 62, 63
]

# Language codes (0=Japanese, 1=English, 2=French, 3=German, 4=Italian, 5=Spanish, etc.)
VALID_LANGUAGES = [1, 2, 3, 4, 5]  # English, French, German, Italian, Spanish


class UnicodeString:
    """Represents a Unicode string in SMDH format."""
    
    def __init__(self, max_length: int):
        self.max_length = max_length
        self.array = [0x0000] * max_length
    
    def set(self, s: str):
        """Set the string value."""
        self.array = [0x0000] * self.max_length
        for i in range(min(self.max_length, len(s))):
            self.array[i] = ord(s[i])
    
    def get_bytes(self) -> bytes:
        """Get the string as bytes for SMDH file."""
        result = b''
        for char_code in self.array:
            result += struct.pack('<H', char_code)
        return result


class SMDHGenerator:
    """Generates SMDH files for 3DS themes."""
    
    def __init__(self):
        self.data = bytearray(SMDH_SIZE)
        self.offset = 0
    
    def write_u8(self, value: int):
        """Write 8-bit unsigned integer."""
        self.data[self.offset] = value & 0xFF
        self.offset += 1
    
    def write_u16(self, value: int):
        """Write 16-bit unsigned integer (little-endian)."""
        struct.pack_into('<H', self.data, self.offset, value & 0xFFFF)
        self.offset += 2
    
    def write_u32(self, value: int):
        """Write 32-bit unsigned integer (little-endian)."""
        struct.pack_into('<I', self.data, self.offset, value & 0xFFFFFFFF)
        self.offset += 4
    
    def write_bytes(self, data: bytes):
        """Write raw bytes."""
        self.data[self.offset:self.offset + len(data)] = data
        self.offset += len(data)
    
    def seek(self, offset: int):
        """Seek to specific offset."""
        self.offset = offset
    
    def convert_image_to_rgb565(self, image: Image.Image, size: int) -> List[int]:
        """Convert PIL image to RGB565 format for SMDH."""
        # Resize image to target size
        image = image.resize((size, size), Image.Resampling.LANCZOS)
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        pixels = []
        for tile_y in range(0, size, 8):
            for tile_x in range(0, size, 8):
                for k in range(64):  # 8x8 tile
                    x = (TILE_ORDER[k] & 0x7) + tile_x
                    y = (TILE_ORDER[k] >> 3) + tile_y
                    
                    if x < size and y < size:
                        r, g, b = image.getpixel((x, y))
                        # Convert to RGB565
                        r = (r >> 3) & 0x1F
                        g = (g >> 2) & 0x3F
                        b = (b >> 3) & 0x1F
                        color = (r << 11) | (g << 5) | b
                        pixels.append(color)
                    else:
                        pixels.append(0)
        
        return pixels
    
    def generate_smdh(self, 
                     theme_name: str,
                     author_name: str,
                     short_description: str,
                     description: str,
                     icon_image: Image.Image) -> bytes:
        """Generate SMDH file with theme information and icon."""
        try:
            self.offset = 0
            
            # Write header
            self.write_u32(SMDH_MAGIC)  # Magic
            self.write_u16(0)  # Version
            self.write_u16(0)  # Reserved
            
            # Write application titles for all languages
            for lang_id in range(16):  # 16 possible languages
                # Use English (lang_id=1) as default for all languages
                short_desc = UnicodeString(0x40)
                long_desc = UnicodeString(0x80)
                publisher = UnicodeString(0x40)
                
                short_desc.set(short_description)
                long_desc.set(description)
                publisher.set(author_name)
                
                # Write title data
                self.write_bytes(short_desc.get_bytes())
                self.write_bytes(long_desc.get_bytes())
                self.write_bytes(publisher.get_bytes())
            
            # Write settings
            # Game ratings (all 0 = no rating)
            for _ in range(0x10):
                self.write_u8(0)
            
            self.write_u32(0)  # Region lock (0 = no lock)
            
            # Match maker ID (all 0)
            for _ in range(0x0C):
                self.write_u8(0)
            
            self.write_u32(0)  # Flags
            self.write_u16(0)  # EULA version
            self.write_u16(0)  # Reserved
            self.write_u32(0)  # Default frame
            self.write_u32(0)  # CEC ID
            
            # Reserved bytes
            for _ in range(0x08):
                self.write_u8(0)
            
            # Convert icon to RGB565 format
            small_icon_data = self.convert_image_to_rgb565(icon_image, 24)
            big_icon_data = self.convert_image_to_rgb565(icon_image, 48)
            
            # Write small icon data
            for color in small_icon_data:
                self.write_u16(color)
            
            # Write big icon data
            for color in big_icon_data:
                self.write_u16(color)
            
            return bytes(self.data)
            
        except Exception as e:
            logger.error(f"Error generating SMDH: {e}")
            raise


def create_smdh_file(theme_name: str,
                    author_name: str,
                    short_description: str,
                    description: str,
                    icon_image_data: bytes) -> bytes:
    """Create SMDH file from theme information and icon image."""
    try:
        # Load icon image from bytes
        icon_image = Image.open(io.BytesIO(icon_image_data))
        
        # Generate SMDH
        generator = SMDHGenerator()
        smdh_data = generator.generate_smdh(
            theme_name=theme_name,
            author_name=author_name,
            short_description=short_description,
            description=description,
            icon_image=icon_image
        )
        
        return smdh_data
        
    except Exception as e:
        logger.error(f"Error creating SMDH file: {e}")
        raise 