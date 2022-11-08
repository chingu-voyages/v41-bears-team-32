import { useRef } from 'react';
import { Text, Group, Button, createStyles } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginTop: 10
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
  }
}));

type DropZoneProp = {
  onDrop: (file: string) => void;
};

export function DropzoneButton({ onDrop }: DropZoneProp) {
  const [fileName, setFileName] = useState('');
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);

  const handleImageUpload = (file: File) => {
    setFileName(file.name);
    console.log(fileName);
    let imageDataUrl = URL.createObjectURL(file);
    onDrop(imageDataUrl);
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        multiple={false}
        openRef={openRef}
        onDrop={(files) => handleImageUpload(files[0])}
        onReject={(files) => console.log('rejected files', files)}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={25 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Image file less than 5mb</Dropzone.Reject>
            <Dropzone.Idle>
              {fileName && (
                <Text
                  className="whitespace-nowrap max-w-[300px]"
                  sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                >
                  {fileName}
                </Text>
              )}
              {!fileName && <>Upload product image</>}
            </Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            {fileName && <>Image Added! To change drop another.</>}
            {!fileName && <>Drag&apos;n&apos;drop or click here to add image.</>}
          </Text>
        </div>
      </Dropzone>
    </div>
  );
}