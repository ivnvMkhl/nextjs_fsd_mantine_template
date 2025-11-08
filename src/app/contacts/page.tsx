import { Container, Title, Stack, Text } from "@mantine/core";

export default function ContactsPage() {
  return (
    <Container size="md" py="md">
      <Stack gap="sm">
        <Title order={1}>Контактная информация</Title>
        <Text>ООО «Ромашка»</Text>
        <Text>ИНН: 7701234567</Text>
        <Text>ОГРН: 1234567890123</Text>
        <Text>Адрес: 125009, г. Москва, ул. Тверская, д. 1</Text>
        <Text>Телефон: +7 (495) 123-45-67</Text>
        <Text>Email: info@romashka.ru</Text>
        <Text>Часы работы: пн–пт, 10:00–19:00</Text>
      </Stack>
    </Container>
  );
}


