import { Portal, Select, createListCollection } from "@chakra-ui/react";

export interface GenericSelectItem {
    label: string;
    value: string;
}

interface GenericSelectProps {
    items: GenericSelectItem[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    width?: string | number;
    label?: string;
    size?: "sm" | "md" | "lg";
}

export function GenericSelect({
    items,
    value,
    onChange,
    placeholder = "Select...",
    width = "180px",
    label,
    size = "sm",
}: GenericSelectProps) {
    const collection = createListCollection({ items });

    return (
        <Select.Root
            collection={collection}
            size={size}
            width={width}
            positioning={{ placement: "bottom", flip: true }}
            value={[value]}
            onValueChange={(details) => {
                const selectedItem = details.items[0];
                if (selectedItem) onChange(selectedItem.value);
            }}
        >
            <Select.HiddenSelect />
            {label && <Select.Label>{label}</Select.Label>}
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={placeholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {collection.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
}
