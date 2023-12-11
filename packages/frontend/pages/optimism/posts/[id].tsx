import MediaDetails from "@/components/Post/MediaDetails";
import DisplayMedia from "@/components/Post/DisplayMedia";
import { usePost } from "@/hooks/api";
import { getCurrentChain } from "@/utils/chains";

import { ActionIcon, SimpleGrid, LoadingOverlay, Center } from "@mantine/core";
import { useRouter } from "next/router";
import { ArrowLeft } from "tabler-icons-react";
import { ChainName } from "@/constants/chains";

const PostPage = () => {
  const router = useRouter();
  const currentChain: ChainName = getCurrentChain(10);
  console.log(currentChain);
  const { data: postQueried, isLoading } = usePost(
    currentChain,
    String(router.query.id)
  );

  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      {postQueried && (
        <>
          <ActionIcon
            onClick={() => router.back()}
            mb="md"
            color="teal"
            size="xl"
            radius="xl"
            variant="filled"
          >
            <ArrowLeft />
          </ActionIcon>
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2, spacing: "lg" },
              { maxWidth: "md", cols: 1, spacing: "md" },
            ]}
          >
            <Center>
              <DisplayMedia post={postQueried} />
            </Center>
            <MediaDetails post={postQueried} currentChain={currentChain} />
          </SimpleGrid>
        </>
      )}
    </div>
  );
};

export default PostPage;
