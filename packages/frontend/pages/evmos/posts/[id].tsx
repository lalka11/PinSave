import {
  ActionIcon,
  Badge,
  Paper,
  SimpleGrid,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import { ArrowLeft } from "tabler-icons-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useNetwork } from "wagmi";

import { usePost } from "@/hooks/api";
import { getCurrentChain } from "@/utils/chains";

const PostPage = () => {
  const router = useRouter();
  const { chain } = useNetwork();
  const currentChain = getCurrentChain(chain?.id as number);
  const { data: post, isLoading } = usePost(
    currentChain,
    router.query.id as string
  );

  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      {post && (
        <>
          <ActionIcon
            onClick={() => router.back()}
            mb="md"
            color="teal"
            size="lg"
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
            <Image src={post.image} alt={post.description} />
            <Paper shadow="sm" p="md" withBorder>
              <h2 style={{ marginBottom: "1.4rem" }}>{post.name}</h2>
              <h4>Descripton</h4>
              <Paper
                shadow="xs"
                withBorder
                px="sm"
                sx={{ backgroundColor: "#82c7fc1d" }}
              >
                <p>{post.description}</p>
              </Paper>
              <div
                style={{
                  fontSize: "medium",
                  color: "#0000008d",
                  padding: "10px",
                }}
              >
                Owned by:{" "}
                <Link
                  href={`https://evm.evmos.dev/address/${post.owner}/transactions#address-tabs`}
                  style={{
                    color: "#198b6eb9",
                  }}
                >
                  {post.owner}
                </Link>
              </div>
              <div
                style={{
                  fontSize: "medium",
                  color: "#0000008d",
                  padding: "10px",
                }}
              >
                Transactions:
                <Badge
                  color="198b6eb9"
                  size="lg"
                  radius="xl"
                  style={{
                    fontSize: "small",
                  }}
                >
                  {post.nTransactions}
                </Badge>
              </div>
            </Paper>
          </SimpleGrid>
        </>
      )}
    </div>
  );
};

export default PostPage;
