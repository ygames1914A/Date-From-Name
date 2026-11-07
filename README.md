# embed-unix-into-date-metadata
Converts unixtimestamps into created date metadata in photos

## Why UnixToDate?
Some photos have their real captured date Unix timestamps in their name but the metadata for created date not exist

## Why is that useful?
when you organize your photos for something like immich you will see that their date is the date when you received the photos not when they were captured that will solve this issue

<img width="2072" height="1071" alt="image(2)(1)" src="https://github.com/user-attachments/assets/b8fd62d6-ea72-4d6f-a4c9-7ac68625bc6a" />

# BIG NOTICE
separate photos you will use with this program because in order to avoid chaos

## Usage

### Linux

Run the Linux executable with the path to your photos directory:

#### prerequisites
##### Fedora
```bash
sudo dnf install perl-Image-ExifTool
```
##### Arch
```bash
sudo pacman -S perl-image-exiftool
```

#### Run it

##### prior to v1.0.7
```bash
chmod +x unixtodate-linux
./unixtodate-linux /path/to/photos
```

##### Since v1.0.7 it now supports multiple sources folders

```bash
chmod +x unixtodate-linux
./unixtodate-linux --src /path/to/photos /path/to/photos
```

### Windows (finally working)

Open Command Prompt or PowerShell and run:

##### prior to v1.0.7

```powershell
.\unixtodate-windows.exe "C:\path\to\photos"
```

##### Since v1.0.7 it now supports multiple sources folders

```powershell
.\unixtodate-windows.exe --src "C:\path\to\photos" "C:\path\to\photos"
```

Replace the example directory with the actual path to your photos.

## Additional timestamps


#### this is only used for version 1.0.8 because it's not needed in the newest versions because it has become automatic
in order to use the whatsapp form using -w or the extended form --whatsapp
```bash
./unixtodate-linux --src /path/to/photos -w
```


## Supported Timestamps

UnixToDate supports two common Unix timestamp formats:

| Digits | Unit | Example |
|---|---|---|
| 10 digits | Seconds | `1735689600` |
| 13 digits | Milliseconds | `1735689600000` |

whatsapp form

| type | Filename | output date |
|---|---|---|
| `Phone` | IMG-20250513 or VID-20250513 | 2025/05/13 hour:00 m:00 s: 00 |
| `Desktop` | WhatsApp Image 2026-10-19 at 11.09.10 PM | 2026/10/16 hour:11 m:09 s:10

## Contributing

Contributions, bug reports, and suggestions are welcome. Feel free to open an issue or submit a pull request.
