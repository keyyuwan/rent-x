import React from "react";
import {
  Calendar as CustomCalendar,
  DateData,
  LocaleConfig,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { getPlatformMonth } from "../../utils/getPlatformDate";

import { ptBR } from "./localeConfig";
import { generateInterval } from "./generateInterval";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface IMarkedDate {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface CalendarProps {
  markedDates: IMarkedDate;
  onDayPress: (date: DateData) => void;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.secondary_600,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { generateInterval, Calendar, IMarkedDate };
